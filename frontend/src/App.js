import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import AdminPanel from './pages/admin/AdminPanel';
import ShopCategory from './pages/user/pages/Products/ShopCategory';
import ProductDetail from './pages/user/pages/Products/ProductDetail/ProductDetail';
import Products from './pages/user/pages/Products/Products';
require('events').EventEmitter.defaultMaxListeners = 20; // Hoặc số lượng giới hạn mà bạn muốn

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <DefaultLayout>
                                        <Page />
                                    </DefaultLayout>
                                }
                            />
                        );
                    })}
                    <Route path={'/admin/*'} element={<AdminPanel />} />
                    {/* <Route path='/quan' element={
                        <DefaultLayout>
                            <ShopCategory category="quan"/>
                        </DefaultLayout>
                    } />
                    <Route path='/ao' element={
                        <DefaultLayout>
                            <ShopCategory category="ao"/>
                        </DefaultLayout>
                    } />
                    <Route path='/vay' element={
                        <DefaultLayout>
                            <ShopCategory category="vay"/>
                        </DefaultLayout>
                    } />
                    <Route path='/phukien' element={
                        <DefaultLayout>
                            <ShopCategory category="phukien"/>
                        </DefaultLayout>
                    } /> */}
                    <Route path='/products' element={<ProductDetail />}>
                        <Route path=':productId' element={<ProductDetail />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
