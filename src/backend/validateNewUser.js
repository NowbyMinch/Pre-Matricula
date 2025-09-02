import { fetch } from 'wix-fetch';

export function validateNewUserEmail(email) {
	return new Promise((resolve) => {
		if (!email || typeof email !== 'string') {
			resolve({ valido: false, mensagem: 'Email não informado.' });
			return;
		}
		const trimmedEmail = email.trim();
		if (trimmedEmail.length === 0) {
			resolve({ valido: false, mensagem: 'Email vazio.' });
			return;
		}
		const emailRegex = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;
		if (!emailRegex.test(trimmedEmail)) {
			resolve({ valido: false, mensagem: 'Formato de email inválido.' });
			return;
		}
		resolve({ valido: true, mensagem: 'Email válido.' });
	});
}

export async function sendRessendCode(email) {
	const code = Math.floor(100000 + Math.random() * 900000).toString();

	const resendApiKey = 'SUA_API_KEY_RESEND';
	const payload = {
		from: 'noreply@exemplo.com', // Verificar como será a chamada de API ao Resend
		to: email,
		subject: 'Seu código de verificação',
		html: `
			<div style="font-family: Arial, sans-serif; color: #222;">
				<h2>Bem-vindo ao Pré-Registro de Novos Alunos!</h2>
				<p>Olá, responsável!</p>
				<p>Estamos muito felizes com seu interesse em nossa instituição. Para garantir a segurança e autenticidade do pré-registro, enviamos abaixo um código de verificação.</p>
				<p style="font-size: 18px; margin: 20px 0;">Seu código de verificação é:</p>
				<p style="font-size: 32px; font-weight: bold; color: #dab927ff;">${code}</p>
				<p>Por favor, insira este código na página de pré-matrícula para continuar o processo de cadastro do aluno.</p>
				<p>Se você não solicitou este pré-registro, pode ignorar este email.</p>
				<br>
				<p>Qualquer dúvida, estamos à disposição para ajudar!</p>
				<p>Atenciosamente,<br>Colégio SEICE - Sistema de Ensino Integrado de Campos Elísios</p>
			</div>
		`
	};

	const response = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${resendApiKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});
	const result = await response.json();

	return {
		enviado: result.id ? true : false,
		code,
		mensagem: result.id ? 'Código enviado com sucesso.' : 'Falha ao enviar o código.'
	};
}

