

import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { GraphQLSchema, defaultFieldResolver } from 'graphql';

// Explicit type layout matching our NextAuth Context setup
interface AuthContext {
  user?: {
    id: string;
    role: 'USER' | 'ADMIN';
  };
}

export function authDirectiveTransformer(schema: GraphQLSchema, directiveName: string = 'auth') {
  return mapSchema(schema, {
    // Intercepts fields across all Object types (Query and Mutation targets)
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      // Extract directive configurations matching our name string
      const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (authDirective) {
        // Read the requested role payload argument configured on the field
        const { role: requiredRole } = authDirective;
        const { resolve = defaultFieldResolver } = fieldConfig;

        // Override the resolver with our structural auth guard wrapper
        fieldConfig.resolve = async function (source, args, context: AuthContext, info) {
          // 1. Guard against entirely unauthenticated calls
          if (!context.user) {
            throw new Error('UNAUTHENTICATED: Request requires active customer session routing.');
          }

          // 2. Guard role escalation privileges (If ADMIN is required but role is USER)
          if (requiredRole === 'ADMIN' && context.user.role !== 'ADMIN') {
            throw new Error('FORBIDDEN: Administrative permission token clearance required.');
          }

          // 3. Fall through to the original backend resolver if constraints match
          return resolve(source, args, context, info);
        };

        return fieldConfig;
      }
    },
  });
}
