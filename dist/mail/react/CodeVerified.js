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
exports.CodeVerified = void 0;
const React = __importStar(require("react"));
const components_1 = require("@react-email/components");
const CodeVerified = ({ code }) => (<components_1.Html>
    <components_1.Tailwind>
      <components_1.Container>
        <components_1.Heading>Your verification code</components_1.Heading>
        <components_1.Text>Your verification code is: <strong>{code}</strong></components_1.Text>
      </components_1.Container>
    </components_1.Tailwind>
  </components_1.Html>);
exports.CodeVerified = CodeVerified;
//# sourceMappingURL=CodeVerified.js.map