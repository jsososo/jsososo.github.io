/**
 *
 * Asynchronously loads the component for ImagePage
 *
 */

import Loadable from 'react-loadable';
import ModuleLoading from 'components/ModuleLoading';

export default Loadable({
  loader: () => import('./index'),
  loading: () => ModuleLoading,
});
