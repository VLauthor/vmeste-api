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
exports.VercelInviteUserEmail = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const components_1 = require("@react-email/components");
const React = __importStar(require("react"));
const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
const VercelInviteUserEmail = ({ username, userImage, invitedByUsername, invitedByEmail, teamName, teamImage, inviteLink, inviteFromIp, inviteFromLocation, }) => {
    const previewText = `Join ${invitedByUsername} on Vercel`;
    return ((0, jsx_runtime_1.jsxs)(components_1.Html, { children: [(0, jsx_runtime_1.jsx)(components_1.Head, {}), (0, jsx_runtime_1.jsx)(components_1.Preview, { children: previewText }), (0, jsx_runtime_1.jsx)(components_1.Tailwind, { children: (0, jsx_runtime_1.jsx)(components_1.Body, { className: "bg-white my-auto mx-auto font-sans px-2", children: (0, jsx_runtime_1.jsxs)(components_1.Container, { className: "border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]", children: [(0, jsx_runtime_1.jsx)(components_1.Section, { className: "mt-[32px]", children: (0, jsx_runtime_1.jsx)(components_1.Img, { src: `${baseUrl}/static/vercel-logo.png`, width: "40", height: "37", alt: "Vercel", className: "my-0 mx-auto" }) }), (0, jsx_runtime_1.jsxs)(components_1.Heading, { className: "text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0", children: ["Join ", (0, jsx_runtime_1.jsx)("strong", { children: teamName }), " on ", (0, jsx_runtime_1.jsx)("strong", { children: "Vercel" })] }), (0, jsx_runtime_1.jsxs)(components_1.Text, { className: "text-black text-[14px] leading-[24px]", children: ["Hello ", username, ","] }), (0, jsx_runtime_1.jsxs)(components_1.Text, { className: "text-black text-[14px] leading-[24px]", children: [(0, jsx_runtime_1.jsx)("strong", { children: invitedByUsername }), " (", (0, jsx_runtime_1.jsx)(components_1.Link, { href: `mailto:${invitedByEmail}`, className: "text-blue-600 no-underline", children: invitedByEmail }), ") has invited you to the ", (0, jsx_runtime_1.jsx)("strong", { children: teamName }), " team on", " ", (0, jsx_runtime_1.jsx)("strong", { children: "Vercel" }), "."] }), (0, jsx_runtime_1.jsx)(components_1.Section, { children: (0, jsx_runtime_1.jsxs)(components_1.Row, { children: [(0, jsx_runtime_1.jsx)(components_1.Column, { align: "right", children: (0, jsx_runtime_1.jsx)(components_1.Img, { className: "rounded-full", src: userImage, width: "64", height: "64" }) }), (0, jsx_runtime_1.jsx)(components_1.Column, { align: "center", children: (0, jsx_runtime_1.jsx)(components_1.Img, { src: `${baseUrl}/static/vercel-arrow.png`, width: "12", height: "9", alt: "invited you to" }) }), (0, jsx_runtime_1.jsx)(components_1.Column, { align: "left", children: (0, jsx_runtime_1.jsx)(components_1.Img, { className: "rounded-full", src: teamImage, width: "64", height: "64" }) })] }) }), (0, jsx_runtime_1.jsx)(components_1.Section, { className: "text-center mt-[32px] mb-[32px]", children: (0, jsx_runtime_1.jsx)(components_1.Button, { className: "bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3", href: inviteLink, children: "Join the team" }) }), (0, jsx_runtime_1.jsxs)(components_1.Text, { className: "text-black text-[14px] leading-[24px]", children: ["or copy and paste this URL into your browser:", " ", (0, jsx_runtime_1.jsx)(components_1.Link, { href: inviteLink, className: "text-blue-600 no-underline", children: inviteLink })] }), (0, jsx_runtime_1.jsx)(components_1.Hr, { className: "border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" }), (0, jsx_runtime_1.jsxs)(components_1.Text, { className: "text-[#666666] text-[12px] leading-[24px]", children: ["This invitation was intended for", " ", (0, jsx_runtime_1.jsx)("span", { className: "text-black", children: username }), ". This invite was sent from ", (0, jsx_runtime_1.jsx)("span", { className: "text-black", children: inviteFromIp }), " ", "located in", " ", (0, jsx_runtime_1.jsx)("span", { className: "text-black", children: inviteFromLocation }), ". If you were not expecting this invitation, you can ignore this email. If you are concerned about your account's safety, please reply to this email to get in touch with us."] })] }) }) })] }));
};
exports.VercelInviteUserEmail = VercelInviteUserEmail;
exports.VercelInviteUserEmail.PreviewProps = {
    username: "alanturing",
    userImage: `${baseUrl}/static/vercel-user.png`,
    invitedByUsername: "Alan",
    invitedByEmail: "alan.turing@example.com",
    teamName: "Enigma",
    teamImage: `${baseUrl}/static/vercel-team.png`,
    inviteLink: "https://vercel.com/teams/invite/foo",
    inviteFromIp: "204.13.186.218",
    inviteFromLocation: "São Paulo, Brazil",
};
exports.default = exports.VercelInviteUserEmail;
//# sourceMappingURL=vercel-invite-user.js.map