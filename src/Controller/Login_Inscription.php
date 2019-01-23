<?php

namespace App\Controller;

use mysql_xdevapi\Exception;
use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class Login_Inscription extends AbstractController
{
    /**
     * @Route ("/Log_Inscription", name="log_sign")
     */
    public function index()
    {

        return $this->render("/Login_Inscription/log_sign.html.twig");
    }



    /**
     * @Route ("/connexion", name="connexion")
     */
    public function connexion(){
        return "";

    }

    /**
     * @Route ("/inscription", name="inscription")
     */
    public function inscription(){
        return "";
    }
}
?>