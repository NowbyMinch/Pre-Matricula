import { sendRessendCode } from 'backend/validateNewUser';
import { validateNewUserEmail } from 'backend/validateNewUser';

$w.onReady(function () {
    $w('#submitButton').onClick(async () => {
        const email = $w('#emailInput').value;
        if (!email) {
            $w('#resultText').text = 'Por favor, insira um email.';
            return;
        }
        const result = await validateNewUserEmail(email);
        if (!result.valido) {
            $w('#resultText').text = result.mensagem;
            return;
        }
        const envio = await sendRessendCode(email);
        if (envio.enviado) {
            $w('#resultText').text = 'Código enviado para o email! Verifique sua caixa de entrada.';
        } else {
            $w('#resultText').text = 'Falha ao enviar o código: ' + envio.mensagem;
        }
    });
});
