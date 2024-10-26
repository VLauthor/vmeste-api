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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeWelcomeEmail = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
const StripeWelcomeEmail = () => ((0, jsx_runtime_1.jsxs)(components_1.Html, { children: [(0, jsx_runtime_1.jsx)(components_1.Head, {}), (0, jsx_runtime_1.jsx)(components_1.Preview, { children: "You're now ready to make live transactions with Stripe!" }), (0, jsx_runtime_1.jsx)(components_1.Body, { style: main, children: (0, jsx_runtime_1.jsx)(components_1.Container, { style: container, children: (0, jsx_runtime_1.jsxs)(components_1.Section, { style: box, children: [(0, jsx_runtime_1.jsx)(components_1.Img, { src: `${baseUrl}/static/stripe-logo.png`, width: "49", height: "21", alt: "Stripe" }), (0, jsx_runtime_1.jsx)(components_1.Hr, { style: hr }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: paragraph, children: "Thanks for submitting your account information. You're now ready to make live transactions with Stripe!" }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: paragraph, children: "You can view your payments and a variety of other information about your account right from your dashboard." }), (0, jsx_runtime_1.jsx)(components_1.Button, { style: button, href: "https://dashboard.stripe.com/login", children: "View your Stripe Dashboard" }), (0, jsx_runtime_1.jsx)(components_1.Hr, { style: hr }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: paragraph, children: ["If you haven't finished your integration, you might find our", " ", (0, jsx_runtime_1.jsx)(components_1.Link, { style: anchor, href: "https://stripe.com/docs", children: "docs" }), " ", "handy."] }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: paragraph, children: ["Once you're ready to start accepting payments, you'll just need to use your live", " ", (0, jsx_runtime_1.jsx)(components_1.Link, { style: anchor, href: "https://dashboard.stripe.com/login?redirect=%2Fapikeys", children: "API keys" }), " ", "instead of your test API keys. Your account can simultaneously be used for both test and live requests, so you can continue testing while accepting live payments. Check out our", " ", (0, jsx_runtime_1.jsx)(components_1.Link, { style: anchor, href: "https://stripe.com/docs/dashboard", children: "tutorial about account basics" }), "."] }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: paragraph, children: ["Finally, we've put together a", " ", (0, jsx_runtime_1.jsx)(components_1.Link, { style: anchor, href: "https://stripe.com/docs/checklist/website", children: "quick checklist" }), " ", "to ensure your website conforms to card network standards."] }), (0, jsx_runtime_1.jsxs)(components_1.Text, { style: paragraph, children: ["We'll be here to help you with any step along the way. You can find answers to most questions and get in touch with us on our", " ", (0, jsx_runtime_1.jsx)(components_1.Link, { style: anchor, href: "https://support.stripe.com/", children: "support site" }), "."] }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: paragraph, children: "\u2014 The Stripe team" }), (0, jsx_runtime_1.jsx)(components_1.Hr, { style: hr }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: footer, children: "Stripe, 354 Oyster Point Blvd, South San Francisco, CA 94080" })] }) }) })] }));
exports.StripeWelcomeEmail = StripeWelcomeEmail;
exports.default = exports.StripeWelcomeEmail;
const main = {
    backgroundColor: "#f6f9fc",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};
const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
};
const box = {
    padding: "0 48px",
};
const hr = {
    borderColor: "#e6ebf1",
    margin: "20px 0",
};
const paragraph = {
    color: "#525f7f",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left",
};
const anchor = {
    color: "#556cd6",
};
const button = {
    backgroundColor: "#656ee8",
    borderRadius: "5px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    width: "100%",
    padding: "10px",
};
const footer = {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "16px",
};
//# sourceMappingURL=stripe-welcome.js.map