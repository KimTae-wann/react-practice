/** @format */
import ArticleMain from './components/articles/ArticleMain.jsx';
import ArticleMain2 from './components/articles/ArticleMain2.jsx';
import MyArticleMain from './components/myarticles/MyArticleMain.jsx';
import TodoMain from './components/todo/TodoMain.jsx';
import { ReactReduxProvider } from './stores/redux/ReactReduxProvider.jsx';
import { ToolkitProvider } from './stores/toolkit/ToolkitStore.jsx';

export default function App() {
  // return <ArticleMain />;
  return (
    <ToolkitProvider>
      <ArticleMain2 />;
    </ToolkitProvider>
  );
  // return (
  //   <ToolkitProvider>
  //     <TodoMain />
  //   </ToolkitProvider>
  // );

  // return <MyArticleMain />;
}

// export default App;
