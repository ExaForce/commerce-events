import { Event } from "@adobe/commerce-events-sdk/dist/types/types/events";
import { SelfDescribingJson, trackStructEvent } from "@snowplow/browser-tracker";

import { createShoppingCartCtx } from "../../contexts";

const handler = (event: Event): void => {
    const { pageContext, shoppingCartContext } = event.eventInfo;
    const shoppingCartCtx = createShoppingCartCtx(shoppingCartContext);

    const context: Array<SelfDescribingJson> = [];

    if (shoppingCartCtx) {
        context.push(shoppingCartCtx);
    }

    trackStructEvent({
        category: "shopping-cart",
        action: "abandon",
        property: pageContext?.pageType,
        context,
    });
};

export default handler;