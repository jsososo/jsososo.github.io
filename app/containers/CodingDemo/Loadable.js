/**
 *
 * Asynchronously loads the component for CodingDemo
 *
 */

import Loadable from 'react-loadable';
import Loading from '../../components/ModuleLoading';

export default Loadable({
  loader: () => import('./index'),
  loading: Loading,
});
