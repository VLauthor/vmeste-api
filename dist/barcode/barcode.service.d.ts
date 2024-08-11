export declare class BarcodeService {
    generateBarcode(text: string): Promise<string>;
    generateQRcode(text: string): Promise<string>;
}
