import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersRegisterRequestDto } from '../dtos/users-register-request.dto';
import { SaqueRequestDto } from '../dtos/saque-request.dto';
import { SaldoAtualizarRequestDto } from '../dtos/saldo-atualizar-request.dto';
import { PremioIndividualRequestDto } from '../dtos/premio-individual-request.dto';
import { createClient } from '@supabase/supabase-js';
import { supabase } from './supaBase';
import axios from 'axios';
import { CreateCotaDto } from '../dtos/create-cota.dto';

@Injectable()
export class BffClient {
  constructor(private readonly configService: ConfigService) {}

  private supabaseUrl = 'https://rxlymqymfccfjupiquvg.supabase.co';
  private supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4bHltcXltZmNjZmp1cGlxdXZnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTI5ODk4NywiZXhwIjoyMDY2ODc0OTg3fQ.szAh31DbMyhtj1dj_nTSR8NOYxKEH_RX50_ct4N0Vh0';

  async register(data: UsersRegisterRequestDto) {
    const { fullName, username, email, whatsapp, password, referredBy } = data;

    const { data: signUpResult, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          username,
          whatsapp,
          referred_by: referredBy,
        },
      },
    });

    if (error || !signUpResult.user?.id) {
      throw new Error('Erro ao cadastrar usuário: ' + error?.message);
    }

    const userId = signUpResult.user.id;

    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .maybeSingle();

    if (fetchError) {
      throw new Error('Erro ao verificar perfil existente: ' + fetchError.message);
    }

    let profileError;

    if (existingProfile) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          username,
          whatsapp,
          referred_by: referredBy ?? null,
        })
        .eq('id', userId);

      profileError = updateError;
    } else {
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          full_name: fullName,
          username,
          whatsapp,
          referred_by: referredBy ?? null,
        });

      profileError = insertError;
    }

    if (profileError) {
      throw new Error('Erro ao salvar dados no perfil: ' + profileError.message);
    }

    return { mensagem: 'Usuário cadastrado com sucesso!' };
  }

  async login(email: string, password: string) {
    const response = await axios.post(
      `${this.supabaseUrl}/auth/v1/token?grant_type=password`,
      { email, password },
      {
        headers: {
          apikey: this.supabaseAnonKey,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  }

  async totalCotasPorUsuario(id: string) {
    const { data, error } = await supabase
      .from('cotas')
      .select('quantity')
      .eq('user_id', id);

    if (error) throw new Error(error.message);

    const total = data.reduce((sum, item) => sum + item.quantity, 0);
    return { total };
  }

  async totalCotasGeral() {
    const { data, error } = await supabase.from('cotas').select('quantity');
    if (error) throw new Error(error.message);

    const total = data.reduce((sum, item) => sum + item.quantity, 0);
    return { total };
  }

  async inserirPremioDoDia(valor_total: number) {
    const { error } = await supabase.from('daily_profits').insert({
      profit_amount: valor_total,
    });

    if (error) throw new Error(error.message);
    return { mensagem: 'Valor do prêmio do dia salvo com sucesso!' };
  }

  async obterPremioDoDia() {
    const { data, error } = await supabase
      .from('daily_profits')
      .select('profit_amount')
      .order('profit_date', { ascending: false })
      .limit(1)
      .single();

    if (error) throw new Error(error.message);
    return { valor_total: data.profit_amount };
  }

  async registrarSaque(data: SaqueRequestDto) {
    const { error } = await supabase.from('transactions').insert({
      user_id: data.id_usuario,
      type: 'saque',
      amount: data.valor,
      status: 'pendente',
      description: `Saque solicitado via chave ${data.tipo_pix}`,
    });

    if (error) throw new Error(error.message);
    return { mensagem: 'Solicitação de saque registrada com sucesso!' };
  }

  async listarSaquesUsuario(id_usuario: string) {
    const { data, error } = await supabase
      .from('transactions')
      .select('id, amount, created_at, status')
      .eq('user_id', id_usuario)
      .eq('type', 'saque')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return { saques: data };
  }

  async obterSaldoDisponivel(id_usuario: string) {
    const { data, error } = await supabase
      .from('transactions')
      .select('amount, type')
      .eq('user_id', id_usuario);

    if (error) throw new Error(error.message);

    const saldo = data.reduce((sum, t) => {
      return sum + (t.type === 'deposito' ? t.amount : -t.amount);
    }, 0);

    return { saldo };
  }

  async adicionarSaldo(data: SaldoAtualizarRequestDto) {
    const { error } = await supabase.from('transactions').insert({
      user_id: data.id_usuario,
      type: 'deposito',
      amount: data.valor,
      status: 'confirmado',
      description: 'Crédito manual',
    });

    if (error) throw new Error(error.message);
    return { mensagem: 'Saldo adicionado com sucesso!' };
  }

  async deduzirSaldo(data: SaldoAtualizarRequestDto) {
    const { error } = await supabase.from('transactions').insert({
      user_id: data.id_usuario,
      type: 'saque',
      amount: data.valor,
      status: 'confirmado',
      description: 'Débito manual',
    });

    if (error) throw new Error(error.message);
    return { mensagem: 'Saldo deduzido com sucesso!' };
  }

  async registrarPremioIndividual(data: PremioIndividualRequestDto) {
    const { error } = await supabase.from('daily_profits').insert({
      profit_amount: data.valor,
      profit_date: new Date().toISOString().slice(0, 10),
    });

    if (error) throw new Error(error.message);
    return { mensagem: 'Prêmio registrado com sucesso!' };
  }

  async obterUsuarioPorId(id: string) {
    const { data: userAuth, error: authError } = await supabase.auth.admin.getUserById(id);
    if (authError || !userAuth) throw new Error('Erro ao buscar usuário autenticado');

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('full_name, whatsapp, username')
      .eq('id', id)
      .single();

    if (profileError || !profile) throw new Error('Erro ao buscar perfil do usuário');

    return {
      id: userAuth.user.id,
      nome: profile.full_name,
      username: profile.username,
      telefone: profile.whatsapp
    };
  }

  async insertCota(dto: CreateCotaDto) {
    const { error } = await supabase.from('cotas').insert({
        user_id: dto.userId,
        quantity: dto.quantity,
        amount_paid: dto.amountPaid,
        created_at: new Date().toISOString(),
    });

    if (error) throw new Error(error.message);
    return { mensagem: 'Cota inserida com sucesso!' };
  }

}