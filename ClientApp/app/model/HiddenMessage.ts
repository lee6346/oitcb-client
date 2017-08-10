
//this object is sent via idle message service to the minimized window component

export class HiddenMessage {
    public conversationId: string;
    public userId: string;
    // chat or watch
    public channelType: string;
    public liveRequest?: boolean;
}