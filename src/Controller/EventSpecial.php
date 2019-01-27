<?php

namespace App\Controller;


use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class  EventSpecial extends  AbstractController
{



    /**
     * @Route ("/evenement_spe" ,name ="evspe")
     */




    public function index()
    {
/*
        //Affichage img
        $dir = 'php/ImgDlEvent/*.{jpg,jpeg,gif,png}';
        $files = glob($dir, GLOB_BRACE);


        foreach ($files as $image) {
             $f = str_replace($dir, '', $image);

        }*/


        return $this->render("/Event/event_spe.html.twig",/*[
            "test" =>$f,
        ]*/);
    }
}


?>