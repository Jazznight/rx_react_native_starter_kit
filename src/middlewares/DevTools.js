import React from 'react';
import devTools from 'remote-redux-devtools';


export default devTools({
  name: 'App Remote devtool',
  hostname: 'localhost', port: 8000,
  maxAge: 30,
  filters: { blacklist: ['EFFECT_RESOLVED'] },
  actionSanitizer: (action) => (
    action.type === 'FILE_DOWNLOAD_SUCCESS' && action.data ?
      { ...action, data: '<<LONG_BLOB>>' } : action
  ),
  stateSanitizer: (state) => state.data ? { ...state, data: '<<LONG_BLOB>>' } : state
});
