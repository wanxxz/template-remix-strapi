import type { Core } from '@strapi/strapi'

export default {
  async register({ strapi }: { strapi: Core.Strapi }) {},
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {}
}
