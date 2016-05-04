/*
 Author: Randy Bimm
 Date 3/30/16

Requires JQuery
 
 ========================== EXAMPLE ====================
 <ul id="slideshow">
   <li id="slideshow_left"><p>&laquo;</p></li>
   <ul id="slideshow_Image">
     <li><img src="http://placehold.it/780x272"/></li>
     <li><img src="http://placehold.it/781x272"/></li>
     <li><img src="http://placehold.it/782x272"/></li>
   </ul>
   <li id="slideshow_right"><p>&raquo;</p></li>
 </ul>
 ========================================================
*/

//Slideshow Settings
var displayTime = 5000;
var animationTime = 750;
var width = 780;
var height = 272;
var slideControlWidth = width/8;

//Animation Types: slide, fade
var animation = "slide";

$(function()
{
    //Add the width and height css
    var css="#slideshow { width:"+width+"px; height: "+height+"px; position: relative; overflow: hidden; list-style-type: none; padding: 0; margin: 0}";
    css += "#slideshow_Image {height: "+height+"px; list-style-type: none; padding: 0;}";
    css+= "#slideshow_left, #slideshow_right {height: "+height+"px; z-index: 1; width: "+slideControlWidth+"px; background-color: rgba(66, 66, 66, 0.025); cursor: pointer; font-size: 0px; position: absolute;}";
    css +="#slideshow #slideshow_Image img { width:"+width+"px; height: "+height+"px; }";
    css +="#slideshow_right{left: "+(width-slideControlWidth)+"px; top: 0px;}";
    css+="#slideshow li p {padding-left: "+(slideControlWidth/3.5)+"px; margin-top: "+(height/3.5)+"px; opacity: 0.2;}";
    css +="#slideshow_Image li {position: absolute;}";
    css +="#slideshow_left:hover, #slideshow_right:hover {background-color: rgba(66, 66, 66, .15); font-size: 5em;}";
    $("head").append("<style>"+css+"</style>");
    
    //Initialize everything needed to run the slideshow
    var list = $("#slideshow_Image"),
        listItems = list.children('li'),
        listLen = list.length,
        index = 0,
        doneAnimation = true;

    //Hide everything that isn't the first item in the slideshow
    listItems.not(':first').hide();
    
    //Start the timer ********************************************************************************************
    var timer = setInterval(run, displayTime, true);

    /**
     Move the slideshow forward
     Only changes the index
    */
    function forward()
    {
        if (index < listItems.length - 1)
            index++;
        else
            index = 0;
    }

    /**
     Move the slideshow backwards
     Only changes the index
    */
    function backwards()
    {
        if (index == 0)
            index = listItems.length - 1;
        else
            index--;
    }

    /**
     Change the image
     p - Previous Image
     n - Next Image
     f - function to get ran after the animation is finished
    */
    function changeImage(p, n, f)
    {
        //Grab each element
        var prev = listItems.eq(p);
        var next = listItems.eq(n);

        //If the chosen animation is 'slide'
        if (animation == "slide")
        {
            //Check if we need to slide the images in from the reverse 
            //(previous is the first image, and the next image is the last image) or (previous is bigger than the next, and previous isn't the last image or next isn't the first image)
            if ((p == 0 && n == listItems.length - 1) || (p > n && (p != listItems.length - 1 || n != 0)))
            {
                slideOutReverse(prev);
                slideInReverse(next, f);
            }
            else
            {
                slideOut(prev);
                slideIn(next, f);
            }
        }
        
        //If the chosen animation is fade
        else if (animation == "fade")
        {
            fadeOut(prev);
            fadeIn(next, f);
        }
    }

    /**
     Runs the slideshow
     forwards - boolean for if the slideshow is moving forwards
    */
    function run(forwards)
    {
        
        //Make sure that the last animation is done before trying to do the next one
        if(doneAnimation)
        {
            doneAnimation = false;
            var p = index;
        
            //Depending on which direction we are going change the way the index gets affected
            if(forwards)
                forward();
            else
                backwards();

            //Change the image
            var n = index;
            changeImage(p, n, function(){doneAnimation = true;});
        }
    }



    /**
     On a left click move the slideshow backwards an image
    */
    $("#slideshow_left").click(function()
    {
       
        clearInterval(timer);

        run(false);
        timer = setInterval(run, displayTime, true);

    });
    
    /**
     On a right click move the slideshow forwards an image
    */
    $("#slideshow_right").click(function()
    {
        clearInterval(timer);

        run(true);
        timer = setInterval(run, displayTime, true);
    });


});

/*
 Fade an image out
 element - The image being affected
*/
function fadeOut(element)
{
    $(element).fadeOut(animationTime);
}

/*
 Fade an image in
 element - The image being affected
 f       - The function to get ran after the animation is done
*/
function fadeIn(element, f)
{
    $(element).fadeIn(animationTime, f);
}

/*
 Slide an image out
 element - The image being affected
*/
function slideOut(element)
{
    $(element).css(
    {
        left: "0px"
    });
    $(element).animate(
    {
        left: "-"+width+"px"
    }, animationTime, function()
    {
        $(element).hide();
    });
}

/*
 Slide an image in
 element - The image being affected
 f       - The function to get ran after the animation is done
*/
function slideIn(element, f)
{
    $(element).show();
    $(element).css(
    {
        left: width+"px"
    });
    $(element).animate(
    {
        left: "0px"
    }, animationTime, f);
}

/*
 Slide an image out in the reverse direction
 element - The image being affected
 f       - The function to get ran after the animation is done
*/
function slideOutReverse(element)
{
    $(element).css(
    {
        left: "0px"
    });
    $(element).animate(
    {
        left: width+"px"
    }, animationTime, function()
    {
        $(element).hide();
    });
}

/*
 Slide an image in from the reverse direction
 element - The image being affected
 f       - The function to get ran after the animation is done
*/
function slideInReverse(element, f)
{
    $(element).show();
    $(element).css(
    {
        left: "-"+width+"px"
    });
    $(element).animate(
    {
        left: "0px"
    }, animationTime, f);
}