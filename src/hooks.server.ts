import type { Handle } from "@sveltejs/kit";
import { building } from '$app/environment'

export const handle = (async ({ event, resolve }) => {

    if (building) {
        const response = await resolve(event)
        return response;
    }

    const auth = event.request.headers.get("Authorization");

    if (auth !== `Basic ${btoa('username:password')}`) {
        return new Response("Not authorized", {
            status: 401,
            headers: {
                "WWW-Authenticate":
                    'Basic realm="Bug", charset="UTF-8"',
            },
        });
    }

    return resolve(event);
}) satisfies Handle;