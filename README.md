# 🇨🇭 Swiss QR Bill API Generator
 
This open-source project provides a **PHP API endpoint** that dynamically generates a **Swiss QR Bill (payment QR code)** based on GET parameters.  
It also includes an optional graphical interface, but the API endpoint remains directly accessible via URL (`path/endpoint/`).

---

## 🚀 Features

- Real-time QR Bill generation in **PNG** format  
- Fully compatible with **PHP 8.4+**  
- Supports **GET** parameters for easy integration  
- Uses **Composer** with [`sprain/swiss-qr-bill`](https://github.com/sprain/swiss-qr-bill)  
- Can be used as both **REST API** and **UI component**

---

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JAWS-Developers-Opensource/EasySwissQrBill
   cd EasySwissQrBill
   ```

2. Install dependencies via **Composer**:
   ```bash
   composer install
   ```

3. Ensure you have **PHP 8.4** (or later) with the following extensions enabled:
   - `ext-gd`
   - `ext-mbstring`
   - `ext-intl`

---

## ⚙️ Usage

The endpoint can be accessed via browser or any HTTP client.

### Endpoint
```
GET /path/endpoint/
```

### Required GET Parameters

| Parameter | Type | Description |
|------------|------|-------------|
| `company`  | string | Debtor’s company or organization name |
| `name`     | string | Full debtor’s name |
| `amount`   | float  | Payment amount in CHF |

### Example Request

Using `curl`:
```bash
curl "https://yourdomain.ch/path/endpoint/?company=JAWS+Developers&name=Timo+Coupek&amount=99.90" --output qrbill.png
```

Or via browser:
```
https://yourdomain.ch/path/endpoint/?company=JAWS+Developers&name=Timo+Coupek&amount=99.90
```

The result will be a **PNG image** containing a valid Swiss QR Bill ready for payment.

---

## 📁 Project Structure

```
.
├── src/
├── vendor/
├── composer.json
├── composer.lock
├── endpoint/
│   └── index.php   ← Main API endpoint
└── README.md
```

---

## 💡 Notes

- The QR Bill image is generated and stored temporarily before being automatically deleted.  
- The API will return a plain text error message if generation fails (e.g., missing parameters or invalid IBAN).  
- You can extend the script to include custom logic for `reference`, `additionalInformation`, or `debtor address`.

---

## 📜 License

Released under the **MIT License**.  
You are free to use, modify, and redistribute the code with proper credit to the original author.

---

## 🙏 Credits

This project uses the amazing [Sprain Swiss QR Bill](https://github.com/sprain/swiss-qr-bill) library.
Big thanks to the maintainers for their work in making Swiss QR Bill generation easy and reliable!

---

## ✍️ Signature

Developed with passion by  
**JAWS Developers** — _Innovation and simplicity in every project._ -->