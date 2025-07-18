import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rxlymqymfccfjupiquvg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4bHltcXltZmNjZmp1cGlxdXZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyOTg5ODcsImV4cCI6MjA2Njg3NDk4N30.DYmorik1kxsA4iDz_iEVQ6sw6t70vvY5bMjgj31kmWU';

const supabase = createClient(
  supabaseUrl!,
  supabaseKey!
);

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token ausente ou inválido');
    }

    const token = authHeader.split(' ')[1];

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    request['user'] = data.user;

    return true;
  }
}
