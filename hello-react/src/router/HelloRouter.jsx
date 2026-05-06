import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TodoMain from '../components/todo/TodoMain';
import ArticleMain2 from '../components/articles/ArticleMain2';
import { MainLayout } from '../components/layout/MainLayout';
import { NotFoundPage } from '../components/layout/error/NotFoundPage';
import { ArticleLayout } from '../components/layout/ArticleLayout';
import { ArticleDetail } from '../components/articles/ArticleDetail';

const HelloRouter = () => {
  // Route 설정
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: 'todo',
          element: <TodoMain />,
        },
        {
          path: 'article',
          element: <ArticleLayout />, // children 이 있는 경우 보통 outlet이 있다.
          children: [
            { index: true, element: <ArticleMain2 /> },
            { path: ':id', element: <ArticleDetail /> },
          ],
        },
      ],
    },
  ]);

  // Router Component 생성
  return <RouterProvider router={router} />;
};

export default HelloRouter;
