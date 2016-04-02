/*
* Author: Randy Bimm
* Date 3/30/16
*
* ========================== EXAMPLE ====================
* <ul id="slideshow">
*   <li id="slideshow_left"><p>&laquo;</p></li>
*   <ul id="slideshow_Image">
*     <li><img src="http://placehold.it/780x272"/></li>
*     <li><img src="http://placehold.it/781x272"/></li>
*     <li><img src="http://placehold.it/782x272"/></li>
*   </ul>
*   <li id="slideshow_right"><p>&raquo;</p></li>
* </ul>
* ========================================================
*/

var displayTime = 5000;
var animationTime = 750;

//Animation Types: slide, fade
var animation = "slide";

$(function()
{

    var list = $("#slideshow_Image");
    var listItems = list.children('li');
    var listLen = list.length;
    var index = 0;

    listItems.not(':first').hide();
    var timer = setInterval(run, displayTime);

    function forward()
    {
        if (index < listItems.length - 1)
            index++;
        else
            index = 0;
    }

    function backwards()
    {
        if (index == 0)
            index = listItems.length - 1;
        else
            index--;
    }

    function changeImage(p, n)
    {
        var prev = listItems.eq(p);
        var next = listItems.eq(n);

        if (animation == "slide")
        {
            if ((p == 0 && n == listItems.length - 1) || (p > n && (p != listItems.length - 1 || n != 0)))
            {
                slideOutReverse(prev);
                slideInReverse(next);
            }
            else
            {
                slideOut(prev);
                slideIn(next);
            }
        }
        else if (animation == "fade")
        {
            fadeOut(prev);
            fadeIn(next);
        }
    }

    function run()
    {
        var p = index;
        forward();
        var n = index;
        changeImage(p, n);
    }



    $("#slideshow_left").click(function()
    {
        clearInterval(timer);

        var p = index;
        backwards();
        var n = index;
        changeImage(p, n);

        timer = setInterval(run, displayTime);

    });
    $("#slideshow_right").click(function()
    {
        clearInterval(timer);

        run();
        timer = setInterval(run, displayTime);
    });


});

function fadeOut(element)
{
    $(element).fadeOut(animationTime);
}

function fadeIn(element)
{
    $(element).fadeIn(animationTime);
}

function slideOut(element)
{
    $(element).css(
    {
        left: "0px"
    });
    $(element).animate(
    {
        left: "-780px"
    }, animationTime, function()
    {
        $(element).hide();
    });
}

function slideIn(element)
{
    $(element).show();
    $(element).css(
    {
        left: "780px"
    });
    $(element).animate(
    {
        left: "0px"
    }, animationTime);
}

function slideOutReverse(element)
{
    $(element).css(
    {
        left: "0px"
    });
    $(element).animate(
    {
        left: "780px"
    }, animationTime, function()
    {
        $(element).hide();
    });
}

function slideInReverse(element)
{
    $(element).show();
    $(element).css(
    {
        left: "-780px"
    });
    $(element).animate(
    {
        left: "0px"
    }, animationTime);
}