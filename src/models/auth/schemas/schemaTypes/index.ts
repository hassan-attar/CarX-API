import { User } from "./user.type";
import {Session} from "./session.type";
import {Provider} from "./provider.type";
import {ThirdPartySession} from "./thirdPartySession.type";

export interface Models {
    User: typeof User;
    Provider: typeof Provider;
    Session: typeof Session;
    ThirdPartySession: typeof ThirdPartySession;
}

export { User, Session, Provider, ThirdPartySession };
