<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class  IdeaController extends  AbstractController
{
        /**
         * @Route ("/boite_a_idee" ,name ="idea")
         */
        public function index()
        {
            return $this->render("/Idea/idea.html.twig");
        }
}
?>

