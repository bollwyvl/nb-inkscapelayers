#!/usr/bin/env python
# -*- coding: utf-8 -*-
from setuptools import setup

try:
    from jupyterpip import cmdclass
except:
    import pip
    import importlib
    pip.main(["install", "jupyter-pip"])
    cmdclass = importlib.import_module("jupyterpip").cmdclass

setup(
    name="nb-inkscapelayers",
    version="0.1.0",
    description="Inkscape SVG Layers in Jupyter Notebook Markdown",
    author="Nicholas Bollweg",
    author_email="nick.bollweg@gmail.com",
    license="New BSD License",
    url="https://github.com/bollwyvl/nb-inkscapelayers",
    keywords="ipython svg inkscape markdown",
    install_requires=["ipython", "jupyter-pip"],
    classifiers=["Development Status :: 4 - Beta",
                 "Framework :: IPython",
                 "Programming Language :: Python",
                 "License :: OSI Approved :: MIT License"],
    packages=["inkscapelayers"],
    include_package_data=True,
    cmdclass=cmdclass("inkscapelayers/static/inkscapelayers"),
)
