import { Middleware, Action } from 'redux';

import { RootState } from '../store';

export const loggerMiddleware: Middleware<{}, RootState> =
(store) => (next) => (action: unknown) => {
    if (!action || typeof action !== 'object' || !('type' in action)) {
      return next(action as Action); // Type assertion to Action
    }

    console.log('type: ', (action as Action).type);
    console.log('payload: ', (action as any).payload); // Adjust this line based on your action structure
    console.log('currentState: ', store.getState());

    next(action as Action);
    
    console.log('next state: ', store.getState());
};
