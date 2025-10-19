import "./PageHome.css";
import { useState, useEffect, useRef } from "react";

const PageHome = () => {
    const [formData, setFormData] = useState({
        amount: "",
        firstName: "",
        lastName: "",
        postalCode: "",
        address: "",
        city: "",
        country: "",
        invoiceNumber: "",
        language: ""
    });

    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const countryRef = useRef(null);
    const languageRef = useRef(null);

    const countries = ["🇨🇭 CH"];
    const languages = ["🇮🇹 Italiano", "🇫🇷 Français", "🇩🇪 Deutsch", "🇬🇧 English"];

    const dictionary = {
        "🇮🇹 Italiano": {
            title: "Dati pagamento",
            language: "Lingua",
            amount: "Importo (CHF)",
            name: "Nome e cognome destinatario",
            residence: "Residenza destinatario",
            postalCode: "CAP",
            address: "Indirizzo",
            city: "Luogo",
            country: "Nazione",
            invoiceNumber: "Numero fattura (referenza)",
            save: "💾 Salva dati",
            placeholders: {
                amount: "0.00",
                firstName: "Nome",
                lastName: "Cognome",
                postalCode: "CAP",
                address: "Indirizzo",
                city: "Luogo",
                invoiceNumber: "Es. INV-2025-001"
            }
        },
        "🇫🇷 Français": {
            title: "Données de paiement",
            language: "Langue",
            amount: "Montant (CHF)",
            name: "Nom et prénom du destinataire",
            residence: "Résidence du destinataire",
            postalCode: "Code postal",
            address: "Adresse",
            city: "Ville",
            country: "Pays",
            invoiceNumber: "Numéro de facture (référence)",
            save: "💾 Enregistrer",
            placeholders: {
                amount: "0.00",
                firstName: "Prénom",
                lastName: "Nom",
                postalCode: "Code postal",
                address: "Adresse",
                city: "Ville",
                invoiceNumber: "Ex. INV-2025-001"
            }
        },
        "🇩🇪 Deutsch": {
            title: "Zahlungsdaten",
            language: "Sprache",
            amount: "Betrag (CHF)",
            name: "Vor- und Nachname des Empfängers",
            residence: "Wohnort des Empfängers",
            postalCode: "PLZ",
            address: "Adresse",
            city: "Ort",
            country: "Land",
            invoiceNumber: "Rechnungsnummer (Referenz)",
            save: "💾 Daten speichern",
            placeholders: {
                amount: "0.00",
                firstName: "Vorname",
                lastName: "Nachname",
                postalCode: "PLZ",
                address: "Adresse",
                city: "Ort",
                invoiceNumber: "z.B. INV-2025-001"
            }
        },
        "🇬🇧 English": {
            title: "Payment details",
            language: "Language",
            amount: "Amount (CHF)",
            name: "Recipient full name",
            residence: "Recipient residence",
            postalCode: "Postal code",
            address: "Address",
            city: "City",
            country: "Country",
            invoiceNumber: "Invoice number (reference)",
            save: "💾 Save data",
            placeholders: {
                amount: "0.00",
                firstName: "First name",
                lastName: "Last name",
                postalCode: "Postal code",
                address: "Address",
                city: "City",
                invoiceNumber: "e.g. INV-2025-001"
            }
        }
    };

    const t = dictionary[formData.language] || dictionary["🇮🇹 Italiano"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        console.log(JSON.stringify(formData, null, 2));
    };

    const selectCountry = (c) => {
        setFormData({ ...formData, country: c });
        setIsCountryOpen(false);
    };

    const selectLanguage = (l) => {
        setFormData({ ...formData, language: l });
        setIsLanguageOpen(false);
    };

    useEffect(() => {
        const browserLang = navigator.language || navigator.userLanguage;

        let defaultLang = "🇮🇹 Italiano";
        if (browserLang.startsWith("fr")) defaultLang = "🇫🇷 Français";
        else if (browserLang.startsWith("de")) defaultLang = "🇩🇪 Deutsch";
        else if (browserLang.startsWith("en")) defaultLang = "🇬🇧 English";

        setFormData((prev) => ({
            ...prev,
            country: countries[0],
            language: defaultLang
        }));

        const handleClickOutside = (event) => {
            if (
                !countryRef.current?.contains(event.target) &&
                !languageRef.current?.contains(event.target)
            ) {
                setIsCountryOpen(false);
                setIsLanguageOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div className="home-page">
            <div className="home-page__form">
                <h1 className="home-page__title">{t.title}</h1>

                <div className="home-page__group">
                    <label className="home-page__label">{t.language}</label>
                    <div
                        ref={languageRef}
                        className={`home-page__dropdown ${isLanguageOpen ? "is-open" : ""}`}
                    >
                        <div
                            className="home-page__dropdown-selected"
                            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                        >
                            {formData.language}
                            <span className="home-page__dropdown-arrow">▾</span>
                        </div>

                        <div className="home-page__dropdown-menu">
                            {languages.map((l) => (
                                <div
                                    key={l}
                                    className={`home-page__dropdown-item ${
                                        l === formData.language ? "is-active" : ""
                                    }`}
                                    onClick={() => selectLanguage(l)}
                                >
                                    {l}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="home-page__group">
                    <label className="home-page__label">{t.amount}</label>
                    <input
                        className="home-page__input"
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder={t.placeholders.amount}
                    />
                </div>

                <div className="home-page__group">
                    <label className="home-page__label">{t.name}</label>
                    <div className="home-page__split">
                        <input
                            className="home-page__input"
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder={t.placeholders.firstName}
                        />
                        <input
                            className="home-page__input"
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder={t.placeholders.lastName}
                        />
                    </div>
                </div>

                <div className="home-page__group">
                    <label className="home-page__label">{t.residence}</label>
                    <div className="home-page__address">
                        <input
                            className="home-page__input"
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleChange}
                            placeholder={t.placeholders.postalCode}
                        />
                        <input
                            className="home-page__input"
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder={t.placeholders.address}
                        />
                        <input
                            className="home-page__input"
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder={t.placeholders.city}
                        />

                        <div
                            ref={countryRef}
                            className={`home-page__dropdown ${isCountryOpen ? "is-open" : ""}`}
                        >
                            <div
                                className="home-page__dropdown-selected"
                                onClick={() => setIsCountryOpen(!isCountryOpen)}
                            >
                                {formData.country}
                                <span className="home-page__dropdown-arrow">▾</span>
                            </div>

                            <div className="home-page__dropdown-menu">
                                {countries.map((c) => (
                                    <div
                                        key={c}
                                        className={`home-page__dropdown-item ${
                                            c === formData.country ? "is-active" : ""
                                        }`}
                                        onClick={() => selectCountry(c)}
                                    >
                                        {c}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="home-page__group">
                    <label className="home-page__label">{t.invoiceNumber}</label>
                    <input
                        className="home-page__input"
                        type="text"
                        name="invoiceNumber"
                        value={formData.invoiceNumber}
                        onChange={handleChange}
                        placeholder={t.placeholders.invoiceNumber}
                    />
                </div>

                <button className="home-page__button" onClick={handleSubmit}>
                    {t.save}
                </button>
            </div>
        </div>
    );
};

export default PageHome;
