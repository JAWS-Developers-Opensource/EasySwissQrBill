<?php

declare(strict_types=1);

use Sprain\SwissQrBill as QrBill;

require __DIR__ . '/vendor/autoload.php'; // aggiusta percorso se necessario

header('Content-Type: image/png');

try {
    // Crea QR Bill
    $qrBill = QrBill\QrBill::create();

    $qrBill->setCreditor(
        QrBill\DataGroup\Element\StructuredAddress::createWithStreet(
            'Timo Domenico Coupek',
            'Via Pizzo di Claro',
            '7',
            '6512',
            'Giubiasco',
            'CH'
        )
    );

    $qrBill->setCreditorInformation(
        QrBill\DataGroup\Element\CreditorInformation::create('CH1909000000166141792') // IBAN del conto privato
    );

    $qrBill->setUltimateDebtor(
        QrBill\DataGroup\Element\StructuredAddress::createWithStreet(
            $_GET['company'],
            $_GET['name'],
            '28',
            '9400',
            'Rorschach',
            'CH'
        )
    );

    $qrBill->setPaymentAmountInformation(
        QrBill\DataGroup\Element\PaymentAmountInformation::create(
            'CHF',
            floatval($_GET['amount'])
        )
    );

    $qrBill->setPaymentReference(
        QrBill\DataGroup\Element\PaymentReference::create(QrBill\DataGroup\Element\PaymentReference::TYPE_NON, null)
    );

    $qrBill->setAdditionalInformation(
        QrBill\DataGroup\Element\AdditionalInformation::create(
            'Pagamento fattura n. 2024001'
        )
    );

    $tmpFile = tempnam(sys_get_temp_dir(), 'qr') . '.png';
    $qrBill->getQrCode()->writeFile($tmpFile);

    readfile($tmpFile);

    unlink($tmpFile);

    exit;
} catch (Exception $e) {
    header('Content-Type: text/plain');
    echo "Errore generazione QR Bill: " . $e->getMessage();
    echo $qrBill->getViolations();
    exit;
}
