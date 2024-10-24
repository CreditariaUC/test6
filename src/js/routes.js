
import HomePage from '../pages/home.jsx';
import { ChatApp } from '../components/ChatApp.jsx';
import {ResultPage} from '../components/ResultPage.jsx';
import Principal from '../components/Principal.jsx';
import {FinalPage} from '../components/FinalPage.jsx';
import { ResultPage3 } from '../components/ResultPage3.jsx';
import { LandingEnd } from '../components/LandingEnd.jsx';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/chat/',
    component: ChatApp,
  },
  {
    path: '/results/',
    component: ResultPage,
    options: {
      transition: 'f7-flip',
    },
  },
  {
    path: '/final/',
    component: FinalPage,
    options: {
      transition: 'f7-flip',
    },
  },
  {
    path: '/landingend/',
    component: LandingEnd,
    options: {
      transition: 'f7-flip',
    },
  },
  {
    path: '/principal/',
    component: Principal,
  },
  {
    path: '(.*)',
    component: HomePage,
  }
];

export default routes;
