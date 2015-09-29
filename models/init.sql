DROP DATABASE wechat;
CREATE DATABASE wechat; 

USE wechat;

DROP TABLE IF EXISTS `user_device`;
CREATE TABLE `user_device` (
  `user_openid` varchar(100) NOT NULL,
  `device_identifier` varchar(200) NOT NULL,
  `device_alias` varchar(200) NOT NULL,
  PRIMARY KEY (`user_openid`, `device_identifier`)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `device`;
CREATE TABLE `device` (
  `identifier` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `device_key` varchar(200) NOT NULL,
  `icon` varchar(200),
  `web_app` varchar(200) NOT NULL,
  PRIMARY KEY (`identifier`)
)ENGINE=MyISAM DEFAULT CHARSET=utf8;
