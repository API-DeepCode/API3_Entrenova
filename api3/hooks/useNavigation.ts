"use client";

import { useRouter } from "next/navigation";

export function useNavigation(){
     const router = useRouter();

     function navigateToLandingPage(){
          router.push("/")
     }

     function navigateToForms(){
          router.push("/forms");
     }

     function navigateToFormsFirstPart(){
          router.push("/forms/firstPart");
     }

     function navigateToFormsSecondPart(){
          router.push("/forms/SecondPart")
     }

     function navigateToFormsThirdPart(){
          router.push("/forms/ThirdPart")
     }

     function navigateToFormsFourthPart(){
          router.push("/forms/FourthPart")
     }

     function navigateToAiAnswer(){
          router.push("/AiAnswer")
     }

     function navigateToPlans(){
          router.push("/plans")
     }

     function navigateToLogin(){
          router.push("/login")
     }

     function navigateToRegister(){
          router.push("/register")
     }

     return {
          navigateToLandingPage,
          navigateToForms,
          navigateToFormsFirstPart,
          navigateToFormsSecondPart,
          navigateToFormsThirdPart,
          navigateToFormsFourthPart,
          navigateToAiAnswer,
          navigateToPlans,
          navigateToLogin,
          navigateToRegister
     };
}