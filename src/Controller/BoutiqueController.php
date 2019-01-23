<?php

namespace App\Controller;


use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;



class  BoutiqueController extends  AbstractController
{

        /**
         * @Route ("/boutique" ,name ="boutique")
         */

        public function index()
        {
            return $this->render("/Boutique/boutique.html.twig");
        }
}





?>