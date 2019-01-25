<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MentionLégaleController extends AbstractController
{


    /**
     * @Route ("/mentions_légales", name="mentions")
     */
    public function index()
    {
        return $this->render("/Footer/mention_legale.html.twig");
    }


}












?>