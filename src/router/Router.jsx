import { BrowserRouter, Route, Routes } from "react-router-dom";
import  PrivateRoute  from "./PrivateRoute";
import { Layout } from "../components/shared/layout/Layout";
import { Home } from "../pages/Home";
import { ProductsDetailsPage } from "../pages/ProductsDetailsPage";
import { Login } from "../pages/Login";
import ProductList from "../pages/ProductList";

const Router = () =>{
    return (
        <BrowserRouter>
            {/* <ScrollToTop /> */}
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout>
                            <Home />
                        </Layout>
                    }
                />
                <Route
                    path="/products/:id"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <ProductsDetailsPage />
                            </Layout>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                    <Layout>
                        <Login />
                    </Layout>
                    }
                />
                <Route
                    path="/register"
                    element={
                    <Layout>
                        <Login />
                    </Layout>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <PrivateRoute>
                            <Layout>
                                <ProductList />
                            </Layout>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;