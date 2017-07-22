
import { Injectable } from '@angular/core';

@Injectable()
export class StateStorageService {

    constructor() { }

    public storeConversationId(conversationId: string) : void {
        if (this.storageAvailable('localStorage')) {
            localStorage.setItem("chatbotconversationid", conversationId);
        }

    }

    public getConversationId() : string {
        return localStorage.getItem("chatbotconversationid");
    }

    public storeSecurityToken(securityToken: string) : void {
        if (this.storageAvailable('localStorage')) {
            localStorage.setItem("chatbotsecuritytoken", securityToken);
        }

    }

    public getSecurityToken() : string {
        return localStorage.getItem("chatbotsecuritytoken");
    }


    public storeUserId(userId: string): void {
        if (this.storageAvailable('localStorage')) {
            localStorage.setItem("chatbotuserid", userId);
        }
    }

    public getUserId(): string {
        return localStorage.getItem("chatbotuserid");
    }

    public storeSocketId(socketId: string) {
        if (this.storageAvailable('localStorage')) {
            localStorage.setItem("socketid", socketId);
        }
    }

    public getSocketId(): string {
        return localStorage.getItem("socketid");
    }

    public removeConversationId() {
        localStorage.removeItem("chatbotconversationid");
    }

    public removeSecurityToken() {
        localStorage.removeItem("chatbotsecuritytoken");
    }

    public removeUserId() {
        localStorage.removeItem("chatbotuserid")
    }

    public removeSocketId() {
        localStorage.removeItem("socketid");
    }


    public storageAvailable(type): boolean {
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return e instanceof DOMException && (
                e.code === 22 ||
                e.code === 1014 ||
                e.name === 'QuotaExceededError' ||
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                storage.length !== 0;
        }
    }


}