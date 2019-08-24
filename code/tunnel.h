#pragma once
#include<string>
#include<iostream>
#include<vector>
#include <glad/glad.h>
#include <GLFW/glfw3.h>
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>
#include"shader.h"
#include "camera.h"
#include"Model.h"
const float halfTunnelLength=1290.0f;
class Tunnel
{
public:
	Tunnel();
	~Tunnel();
	void init(std::string const &path);
	void draw(shader shader);
	void update();
	void again();
private:
	float posZA;
	float posZB;
	Model modelA;
	Model modelB;
	bool work;//work��true����A����Ұ�У�����B����Ұ��
};

