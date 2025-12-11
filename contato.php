<?php
// Configurações
$para = "felipe@felipempadula.com"; 
$assunto_padrao = "Novo contato via Site";

// Variáveis para mensagens de feedback
$msg_classe = "";
$msg_texto = "";

// Verifica se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Sanitização dos dados (Limpeza para segurança)
    $nome = strip_tags(trim($_POST["nome"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $mensagem = strip_tags(trim($_POST["mensagem"]));

    // 2. Validação básica
    if (empty($nome) || empty($mensagem) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $msg_classe = "erro";
        $msg_texto = "Por favor, preencha todos os campos corretamente.";
    } else {
        // 3. Montagem do E-mail
        $assunto = "$assunto_padrao: $nome";
        
        $corpo_email = "Você recebeu uma nova mensagem do seu site.\n\n";
        $corpo_email .= "Nome: $nome\n";
        $corpo_email .= "Email: $email\n";
        $corpo_email .= "Mensagem:\n$mensagem\n";

        // 4. Cabeçalhos (Essencial para não cair no SPAM)
        // IMPORTANTE: O 'From' deve ser um e-mail do SEU domínio, não do usuário.
        // Se seu site é felipempadula.com, use algo como noreply@felipempadula.com
        $headers = "From: noreply@felipempadula.com\r\n";
        $headers .= "Reply-To: $email\r\n"; // Ao clicar em responder, vai para o cliente
        $headers .= "X-Mailer: PHP/" . phpversion();

        // 5. Enviar
        if (mail($para, $assunto, $corpo_email, $headers)) {
            $msg_classe = "sucesso";
            $msg_texto = "Mensagem enviada com sucesso! Em breve entrarei em contato.";
        } else {
            $msg_classe = "erro";
            $msg_texto = "Falha ao enviar o e-mail. Tente novamente mais tarde.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entre em Contato | Felipe M. Padula</title>
    <style>
        /* Estilos CSS modernos */
        :root {
            --bg-color: #0f172a;
            --card-bg: #1e293b;
            --text-color: #f1f5f9;
            --primary: #3b82f6;
            --primary-hover: #2563eb;
            --border: #334155;
            --error: #ef4444;
            --success: #10b981;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }

        .contact-container {
            background-color: var(--card-bg);
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            width: 100%;
            max-width: 500px;
            border: 1px solid var(--border);
        }

        h2 { margin-top: 0; text-align: center; margin-bottom: 1.5rem; }

        .form-group { margin-bottom: 1.2rem; }

        label { display: block; margin-bottom: 0.5rem; font-size: 0.9rem; font-weight: 500; }

        input, textarea {
            width: 100%;
            padding: 0.75rem;
            border-radius: 6px;
            border: 1px solid var(--border);
            background-color: var(--bg-color);
            color: var(--text-color);
            font-size: 1rem;
            box-sizing: border-box; /* Garante que o padding não estoure a largura */
            transition: border-color 0.2s;
        }

        input:focus, textarea:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }

        button {
            width: 100%;
            padding: 0.85rem;
            background-color: var(--primary);
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        button:hover { background-color: var(--primary-hover); }

        .feedback {
            padding: 1rem;
            border-radius: 6px;
            margin-bottom: 1.5rem;
            text-align: center;
            font-size: 0.9rem;
        }
        .feedback.sucesso { background-color: rgba(16, 185, 129, 0.2); color: var(--success); border: 1px solid var(--success); }
        .feedback.erro { background-color: rgba(239, 68, 68, 0.2); color: var(--error); border: 1px solid var(--error); }
    </style>
</head>
<body>

    <div class="contact-container">
        <h2>Fale Comigo</h2>

        <?php if (!empty($msg_texto)): ?>
            <div class="feedback <?php echo $msg_classe; ?>">
                <?php echo $msg_texto; ?>
            </div>
        <?php endif; ?>

        <form action="contato.php" method="POST">
            <div class="form-group">
                <label for="nome">Nome</label>
                <input type="text" id="nome" name="nome" required placeholder="Seu nome completo">
            </div>

            <div class="form-group">
                <label for="email">E-mail</label>
                <input type="email" id="email" name="email" required placeholder="seu@email.com">
            </div>

            <div class="form-group">
                <label for="mensagem">Mensagem</label>
                <textarea id="mensagem" name="mensagem" rows="5" required placeholder="Como posso ajudar?"></textarea>
            </div>

            <button type="submit">Enviar Mensagem</button>
        </form>
    </div>

</body>
</html>