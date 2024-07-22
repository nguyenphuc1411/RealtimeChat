// signalRService.js
import * as signalR from "@microsoft/signalr";
import { BaseUrl } from "./BaseUrl";

class SignalRService {
    constructor() {
        this.connection = null;
    }

    start(token) {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`${BaseUrl}chathub`, {
                accessTokenFactory: () => token
            })
            .withAutomaticReconnect()
            .build();

        this.connection.onclose(async (error) => {
            console.error('SignalR connection closed with error: ', error);
            await this.start(token); // Retry connection
        });

        return this.connection.start()
            .then(() => {
                console.log('SignalR connected');
            })
            .catch(err => {
                console.error('SignalR connection error: ', err);
                throw err;
            });
    }

    async send(event, ...args) {
        try {
            if (!this.connection || this.connection.state !== signalR.HubConnectionState.Connected) {
                throw new Error("SignalR connection is not established.");
            }
            await this.connection.send(event, ...args);
        } catch (err) {
            console.error('SignalR send error: ', err);
            throw err;
        }
    }

    on(event, callback) {
        if (!this.connection) {
            throw new Error('SignalR connection is not established.');
        }
        this.connection.on(event, callback);
    }
}

const signalRService = new SignalRService();
export default signalRService;
