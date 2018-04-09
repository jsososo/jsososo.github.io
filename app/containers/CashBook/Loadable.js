/**
 *
 * Asynchronously loads the component for CashBook
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
