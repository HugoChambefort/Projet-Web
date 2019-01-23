<?php

namespace App\Controller;


use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;



class  AccueilController extends  AbstractController
{

        /**
         * @Route ("/" ,name ="home")
         */

        public function index()
        {
            return $this->render("/accueil/accueil.html.twig");
        }
}





?>