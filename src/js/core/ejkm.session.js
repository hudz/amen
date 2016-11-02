var _sessionTimer;
var _checkSec = 1000 * 60 * 25;
var _exitSec = 1000 * 60 * 15;

jQuery(document).ready(function ()
{
    _sessionTimer = window.setInterval(showSessionAlert, _checkSec);
});

function yaSession()
{
    window.clearInterval(_sessionTimer);
    hideSessionAlert();
    restartSession();
}

function tidakSession()
{
    endSession();
}

function showSessionAlert()
{
    window.clearInterval(_sessionTimer);
    blockInterface();
}

function blockInterface()
{
    jQuery.get("/eJKM/utility/sessionMessage.jsp",

    function (data)
    {
        _sessionTimer = window.setInterval(endSession, _exitSec);
        jQuery.blockUI(
        {
            message: data,
            css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: '.5',
                color: '#fff',
                width: '400px'
            }
        });
    });
}

function hideSessionAlert()
{
    jQuery.unblockUI();
}

function endSession()
{
    //window.location = "/eJKM/";
    jQuery.get('/eJKM/faces/logout.jspx',
    {
        'oracle.adf.faces.FORM': 'form1',
        'oracle.adf.faces.STATE_TOKEN': 1,
        'source': 'form1:commandButton1'
    },

    function (data)
    {
        endSession2();
    });
}

function endSession2()
{
    //window.location = "/eJKM/";
    jQuery.get('/eJKM/faces/logout.jspx',
    {
        'oracle.adf.faces.FORM': 'form1',
        'oracle.adf.faces.STATE_TOKEN': 1,
        'source': 'form1:commandButton1'
    },

    function (data)
    {
        window.location = "/eJKM/faces/index.jsp";
    });
}

function restartSession()
{
    _sessionTimer = window.setInterval(showSessionAlert, _checkSec);
}