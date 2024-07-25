"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const crypto_js_1 = __importDefault(require("crypto-js"));
dotenv.config();
const app = (0, express_1.default)();
const port = process.env.BACKEND_PORT;
const encryptionPassphrase = process.env.ENCRYPTION_PASSPHRASE || 'oton_passphrase';
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/oton_wallet', {
    useFindAndModify: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB', error);
});
const walletSchema = new mongoose_1.default.Schema({
    address: { type: String, required: true },
    publicKey: { type: String, required: true },
    encryptedPassphrase: { type: String, required: true },
    email: { type: String, required: false },
    photo: { type: String, required: false },
    username: { type: String, required: false },
}, {
    collection: 'wallets'
});
const Wallet = mongoose_1.default.model('Wallet', walletSchema);
app.post('/api/wallets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, publicKey, encryptedPassphrase, email, photo, username } = req.body;
    if (!address || !publicKey || !encryptedPassphrase) {
        res.status(400).send("Parameters missing");
        return;
    }
    const wallet = new Wallet({ address, publicKey, encryptedPassphrase, email, photo, username });
    wallet.save().then((e) => {
        res.status(201).send(wallet);
    }).catch((e) => {
        res.status(400).send(e);
    });
}));
app.patch('/api/wallets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, publicKey, encryptedPassphrase, newEncryptedPassphrase, hashedPassword, email, photo, username } = req.body;
    if (!address || !publicKey) {
        res.status(400).send("Parameters missing");
        return;
    }
    const wallet = yield Wallet.findById({ address }).catch(e => {
        res.status(400).send("Server error");
        return null;
    });
    if (!wallet) {
        res.status(400).send("Not a valid wallet address");
        return;
    }
    const updateFields = {};
    if (newEncryptedPassphrase) {
        updateFields.encryptedPassphrase = newEncryptedPassphrase;
    }
    else {
        if (!encryptedPassphrase || !hashedPassword) {
            res.status(400).send("Parameters missing");
            return;
        }
        Object.assign(updateFields, Object.assign(Object.assign(Object.assign({}, (email && { email })), (photo && { photo })), (username && { username })));
        const passphrase = crypto_js_1.default.AES.decrypt(encryptedPassphrase, hashedPassword).toString();
        const pass = crypto_js_1.default.AES.decrypt(wallet.encryptedPassphrase, hashedPassword).toString();
        if (passphrase != pass) {
            res.status(403).send("Forbidden: You don't have premission to see this data");
            return;
        }
    }
    yield wallet.updateOne({ address }, updateFields).then(e => {
        res.status(200).send(true);
        return;
    }).catch((e) => {
        res.status(400).send("Server error");
        return;
    });
}));
app.get('/api/wallets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(Object.entries(req.query).map(([key, value]) => [key, value, typeof value]));
    const { address, encryptedPassphrase, hashedPassword } = req.query;
    if (!encryptedPassphrase || !address) {
        res.status(400).send("Parameters missing");
        return;
    }
    let passphrase;
    try {
        passphrase = crypto_js_1.default.AES.decrypt(encryptedPassphrase, hashedPassword).toString();
        console.log(passphrase);
    }
    catch (e) {
        res.status(400).send("Wrong password");
        return;
    }
    Wallet.findOne({ address }).then(e => {
        if (!e) {
            res.status(400).send("Not a valid wallet address");
            return;
        }
        const pass = crypto_js_1.default.AES.decrypt(e.encryptedPassphrase, hashedPassword).toString();
        console.log(pass);
        if (passphrase != pass) {
            res.status(403).send("Forbidden: You don't have premission to see this data");
            return;
        }
        const data = {
            address: e.address,
            encryptedPassphrase: e.encryptedPassphrase,
            email: e.email,
            publicKey: e.publicKey,
            photo: e.photo,
            username: e.username,
        };
        res.status(200).json(data);
        return;
    }).catch((e) => {
        res.status(400).send("Server error");
    });
}));
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
