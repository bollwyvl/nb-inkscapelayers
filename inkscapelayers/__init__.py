import os
from IPython.display import (
    display,
    Javascript,
)


def load_ipython_extension(ip):
    main_js = os.path.join(os.path.dirname(__file__),
                           "static",
                           "inkscapelayers",
                           "main.js")
    display(Javascript(main_js))
