
//ang libraries
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

//Direct Line libraries
import { DirectLine, Conversation } from 'botframework-directlinejs';

import { OpenChannel, CloseChannel, ChannelData, Connection } from '../model';

//rxjs
import * as Rx from 'rxjs/Rx';


@Injectable()
export class ChannelConnectionService {

    private newChannelUri = "/api/Channel/StartChannel";
    private endChannelUri = "/api/Channel/EndChannel";
    private getOpenChannelsUri = "/api/Channel/GetOpenChannels";
    private getChannelsUri = "/api/Channel/GetChannels";
    private newConnectionUri = "/api/Channel/GetConnection/";

    constructor(private http: Http) { }



    public openChannel$(): Rx.Observable<Conversation> {
        return this.http.get(this.newChannelUri, this.getRequestOptions())
            .map(res => res.json() as Conversation);
    }

    public getConnectionUrl$(conv_id: string): Rx.Observable<Connection> {
        return this.http.get(this.newConnectionUri + conv_id, this.getRequestOptions())
            .map(res => res.json() as Connection);
    }

    public closeChannel$(conv_id: string): Rx.Observable<any> {
        return this.http.post(this.endChannelUri, { conversationId: conv_id } as CloseChannel , this.getRequestOptions())
            .map(res => res.json());
    }

    public getOpenChannels$(): Rx.Observable<OpenChannel[]> {
        return this.http.get(this.getOpenChannelsUri, this.getRequestOptions())
            .map(res => res.json());
    }

    public getChannels$(): Rx.Observable<ChannelData[]> {
        return this.http.get(this.getChannelsUri, this.getRequestOptions())
            .map(res => res.json());
    }


    public getRequestOptions(): RequestOptions {
        return new RequestOptions(new Headers({ 'Content-Type': 'application/json' }));
    }
}