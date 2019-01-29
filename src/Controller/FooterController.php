<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class FooterController extends AbstractController
{


    /**
     * @Route ("/mentions_légales", name="mentions")
     */
    public function indexment()
    {
        return $this->render("/Footer/mention_legale.html.twig");
    }


    /**
     * @Route ("/politique_confidentialite", name="politique")
     */
    public function indexpol()
    {
        return $this->render("/Footer/politique.html.twig");
    }



}












?>