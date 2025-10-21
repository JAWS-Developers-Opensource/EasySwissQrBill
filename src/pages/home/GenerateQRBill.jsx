import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SwissQRBill } from "swissqrbill/svg";

export default function QrBillScreen() {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // 1️⃣ Leggi i parametri GET
        const data = {
            amount: parseFloat(searchParams.get("amount")) || 1994.75,
            currency: searchParams.get("currency") || "CHF",
            creditor: {
                account: searchParams.get("account") || "CH44 3199 9123 0008 8901 2",
                name: searchParams.get("creditor_name") || "SwissQRBill",
                address: searchParams.get("creditor_address") || "Musterstrasse",
                buildingNumber: parseInt(searchParams.get("creditor_buildingNumber")) || 7,
                zip: parseInt(searchParams.get("creditor_zip")) || 1234,
                city: searchParams.get("creditor_city") || "Musterstadt",
                country: searchParams.get("creditor_country") || "CH",
            },
            debtor: {
                name: searchParams.get("debtor_name") || "Peter Muster",
                address: searchParams.get("debtor_address") || "Musterstrasse",
                buildingNumber: parseInt(searchParams.get("debtor_buildingNumber")) || 1,
                zip: parseInt(searchParams.get("debtor_zip")) || 1234,
                city: searchParams.get("debtor_city") || "Musterstadt",
                country: searchParams.get("debtor_country") || "CH",
            },
            reference: searchParams.get("reference") || "21 00000 00003 13947 14300 09017",
        };

        // 2️⃣ Genera lo SVG
        const svg = new SwissQRBill(data).element;

        // 3️⃣ Crea un canvas e disegna lo SVG per convertirlo in PNG
        const svgString = new XMLSerializer().serializeToString(svg);
        const img = new Image();
        const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);

            // 4️⃣ Converte in dataURL PNG e mostra l’immagine
            const pngData = canvas.toDataURL("image/png");
            document.body.innerHTML = ""; // pulisci
            const image = document.createElement("img");
            image.src = pngData;
            image.style.width = "100%";
            document.body.appendChild(image);
        };

        img.src = url;
    }, [searchParams]);

    return null; // niente HTML visibile
}