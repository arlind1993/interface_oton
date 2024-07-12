"use strict";
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
const app = (0, express_1.default)();
const port = 5000;
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
    privateKey: { type: String, required: true },
}, {
    collection: 'wallets'
});
const Wallet = mongoose_1.default.model('Wallet', walletSchema);
app.post('/api/wallets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, privateKey } = req.body;
    const wallet = new Wallet({ address, privateKey });
    try {
        yield wallet.save();
        res.status(201).send(wallet);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
