$(function(){
  $(".device-list > li").each(function(){
    var that = $(this);
    $.getJSON('/common/device/info?identifier='+$(this).find('.device-identifier').text(), function(data){
      if(data.online){
        that.find(".device-status").removeClass("device-status-offline").addClass("device-status-online");
      }
      that.data("url", data.webapp);
      that.find(".device-icon").css("background-image", "url(" + data.icon + ")");
    }); 
  });
  $(".device-list > li").on("click", function(){
    var identifier = $(this).find(".device-identifier").text();
    if($(this).find(".device-status").hasClass("device-status-offline")){
      alert("该设备当前不可用");
    } else {
      if($(this).data("url")){
        location.href = $(this).data("url") + "?from=wechat&identifier=" + identifier;
      }
    }
  });
});
