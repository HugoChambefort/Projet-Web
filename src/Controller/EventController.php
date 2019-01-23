<?php

namespace App\Controller;


use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;



class  EventController extends  AbstractController
{

        /**
         * @Route ("/events" ,name ="evenement")
         */

        public function index()
        {
            return $this->render("/Event/event.html.twig");
        }
}





?>