import { c as defineEventHandler, r as readBody, e as createError } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';

const contact_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, phone, email, message } = body;
  if (!name || !phone || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: "Todos los campos son requeridos" });
  }
  console.log("[Contact Form]", { name, phone, email, message });
  return { success: true };
});

export { contact_post as default };
//# sourceMappingURL=contact.post.mjs.map
