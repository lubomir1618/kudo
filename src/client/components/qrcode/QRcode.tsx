import React, { Component } from 'react';
import QrCodeLib from 'qrcode';

interface Props {
    url: string;
}
export default class QRcode extends Component<Props> {

    public componentDidMount() {
        const canvas = document.getElementById('canvas');
        QrCodeLib.toCanvas(canvas, this.props.url, {errorCorrectionLevel: 'H', width: 190})
    }
    public render(): JSX.Element {
        return (
            <canvas id="canvas"></canvas>
        )
    }
}